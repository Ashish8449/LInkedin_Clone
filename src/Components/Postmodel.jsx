import React, { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import { postArticlAPi } from "../Actions";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  bottom: 0;
  right: 0;
  color: black;
  background-color: rbga(0, 0, 0 0.7);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background: white;

  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;
const Header = styled.div`
  display: block;
  padding: 16px 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  line-height: 1.5;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    background: transparent;
    border: none;
    svg,
    img {
      pointer-events: none;
    }
  }
`;
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;
const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
`;
const AssestButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-height: auto;
  color: rgba(0, 0, 0, 0.5);
`;
const AttactedAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssestButton} {
    width: 50px;
  }
`;
const SharedComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
`;
const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding: 10px 16px;
  background: ${(props) =>
    props.disabled ? "rgba(0,0 , 0, 0.15)" : "#0a66c2"};
  color: ${(props) => (props.disabled ? "rgba(0,0 , 0, 0.15)" : "white")};
  &:hover {
    background: ${(props) =>
      props.disabled ? "rgba(0,0 , 0, 0.15)" : "#0a66c2"};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 30px;
    margin-bottom: 20px;
  }
`;
const Uploadimg = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;
export function Postmodel(props) {
  const [editorText, seteditorText] = useState("");
  const [sharedImage, setSharedImage] = useState("");
  const [videoLink, setVidoLink] = useState("");
  // const [assetArea, setAssetArea]= useState("");
  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not ann image , the file is a ${typeof image}`);
      return;
    }
    setSharedImage(image);
  };

  // const switchAssesArea= (area)=>{
  //   setSharedImage("");
  //   setVidoLink("");
  //   setAssetArea(area)

  // }
 
  const rest = (e) => {
    seteditorText("");
    setSharedImage("");
    setVidoLink("");
    props.handleClick(e);
  };

  const postArticle = (e) => {
    console.log("click");
    e.preventDefault();
    const payload = {
      image: sharedImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };
    console.log("👇");
    props.postArticlAPi(payload);
    seteditorText("");
    setSharedImage("");
    setVidoLink("");
    props.handleClick(e);
  };
  return (
    <Container>
      <Content>
        <Header>
          <h2>Create a post</h2>
          <button onClick={rest}>
            <img src="/images/close-icon.svg" alt="" />
          </button>
        </Header>
        <SharedContent>
          <UserInfo>
            {props.user.photoURL ? (
              <img src={props.user.photoURL} alt="" />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}

            <span> {props.user.displayName}</span>
          </UserInfo>
          <Editor>
            <textarea
              value={editorText}
              onChange={(e) => seteditorText(e.target.value)}
              placeholder="What do you want ot talk about?"
              autoFocus={true}
            />
            <Uploadimg>
              <input
                type="file"
                accept="image/gif, image/jpeg, image/png"
                name="image"
                id="file"
                style={{
                  display: "none",
                }}
                onChange={handleChange}
              />
              {!sharedImage && (
                <p>
                  <label htmlFor="file">Select an image to share</label>
                </p>
              )}
              {sharedImage && (
                <img src={URL.createObjectURL(sharedImage)} alt="" />
              )}
              <>
                <input
                  type="text"
                  placeholder="Enter video link vlaue"
                  value={videoLink}
                  onChange={(e) => setVidoLink(e.target.value)}
                />
              </>
              {videoLink && <ReactPlayer width={`100%`} url={videoLink} />}
            </Uploadimg>
          </Editor>
        </SharedContent>
        <SharedCreation>
          <AttactedAssets>
            <AssestButton>
              <img src="/images/share-image.svg" alt="" />
            </AssestButton>{" "}
            <AssestButton>
              <img src="/images/share-video.svg" alt="" />
            </AssestButton>{" "}
          </AttactedAssets>

          <SharedComment>
            <AssestButton>
              <img src="/images/share-comment.svg" alt="" />
              Anyone
            </AssestButton>{" "}
          </SharedComment>
          <PostButton
            disabled={!editorText ? true : false}
            onClick={(e) => {
              console.log("click on a button");
              postArticle(e);
            }}
          >
            Post
          </PostButton>
        </SharedCreation>
      </Content>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postArticlAPi: (payload) => dispatch(postArticlAPi(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Postmodel);
