import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import styled from "styled-components";
import { getArticlesApi } from "../Actions";
import Postmodel from "./Postmodel";

const Main = (props) => {
  useEffect(() => {
    props.getArticlesApi();
  }, []);

  const [showModel, setShowModel] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setShowModel(!showModel);
  };
  console.log(props.loading);
  return (
    <>
      {props.articles.length === 0 ? (
        <p>There are no articles</p>
      ) : (
        <Container>
          <Sharebox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt="" />
              ) : (
                <img src="/images/user.svg" alt="" />
              )}

              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
              >
                Start a post
              </button>
            </div>
            <div>
              <button>
                <img src="/images/photo-icon.svg" alt="" />
                <span>Photo</span>
              </button>
              <button>
                <img src="/images/video-icon.svg" alt="" />
                <span>Video</span>
              </button>
              <button>
                <img src="/images/event-icon.svg" alt="" />
                <span>Event</span>
              </button>
              <button>
                <img src="/images/article-icon.svg" alt="" />
                <span>Write Article</span>
              </button>
            </div>
          </Sharebox>
          <Content>
            {props.loading && <img src="/images/spin-loader.gif" />}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      {/* profile img  */}
                      <img src={article.actor.image} alt="" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      {/* thriple dot */}
                      <img src="/images/ellipses.svg" alt="" />
                    </button>
                  </SharedActor>
                  <Description>
                    {article.discription}
                    <ShardeImg>
                      {!article.shardeImg && article.video ? (
                        <ReactPlayer
                          width={`100%`}
                          url={article.video}
                        ></ReactPlayer>
                      ) : (
                        ""
                      )}
                      {article.shardeImg && (
                        <a>
                          <img src={article.shardeImg} alt="" />
                        </a>
                      )}
                    </ShardeImg>
                    <SocialCount>
                      <li>
                        <button>
                          <img
                            src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                            alt="like img"
                          />
                          {/* <img src="https://static-exp1.licdn.com/sc/h/5thsbnikm6a8auov24ygwd914f" alt="" /> */}
                          <img
                            src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97"
                            alt=""
                          />
                          <span>75</span>
                        </button>
                      </li>
                      <li>
                        <a>2 comments</a>
                      </li>
                    </SocialCount>
                    <SocialActions>
                      <button>
                        <img src="/images/like-icon.svg" alt="" />
                        <span>Like</span>
                      </button>
                      <button>
                        <img src="/images/comment-icon.svg" alt="" />
                        <span>Comment</span>
                      </button>
                      <button>
                        <img src="/images/share-icon.svg" alt="" />
                        <span>Comment</span>
                      </button>
                      <button>
                        <img src="/images/send-icon.svg" alt="" />
                        <span>Comment</span>
                      </button>
                    </SocialActions>
                  </Description>
                </Article>
              ))}
          </Content>
          {showModel && (
            <Postmodel showModel={showModel} handleClick={handleClick} />
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;
const CommanCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;
const Sharebox = styled(CommanCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      /* color:red; */
      font-size: 14px;
      line-height: 1.5rem;
      min-height: 48px;
      background: transparent;
      text-align: center;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 6px 4px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;
const Article = styled(CommanCard)`
  padding: 0;
  margin: 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    outline: none;
    border: none;
    top: 5px;
    right: 10px;
    background: transparent;
    img {
      width: 20px;
    }
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  text-align: left;
`;
const ShardeImg = styled.div`
  margin-top: 12px;
  width: 100%;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCount = styled.ul`
  list-style: none;
  line-height: 1.5rem;
  align-items: flex-start;
  display: flex;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;

  border-bottom: 1px solid #e9e5df;
  li {
    margin: 0 5px;
    font-size: 12px;
    button {
      display: flex;
    }
  }
`;
const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;
const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  padding: 4px 8px;
  min-height: 40px;

  button {
    display: inline-flex;
    align-items: center;
    padding: 8px 10px;
    color: #70b5f9;
    font-weight: 700;
    span {
      margin-left: 5px;
    }

    @media (min-width: 768px) {
      span {
        margin-left: 10px;
      }
    }
  }
`;
const mapStateToProps = (state) => {
  return {
    loading: state.articeState.loading,
    user: state.userState.user,
    articles: state.articeState.articles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getArticlesApi: () => dispatch(getArticlesApi()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
