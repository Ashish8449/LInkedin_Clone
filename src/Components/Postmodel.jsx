import React, { useState } from "react";
import styled from "styled-components";
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  bottom: 0;
  right: 0;
  color: black;
  background-color: rbga(0, 0, 0 0.7);
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
    svg {
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
  background: blue;
  color: white;
  &:hover {
    background: #004182;
  }
`;

export default function Postmodel() {
  const [editorText, seteditorText] = useState("");
  return (
    <Container>
      <Content>
        <Header>
          <h2>Create a post</h2>
          <button>
            <img src="/images/close-icon.svg" alt="" />
          </button>
        </Header>
        <SharedContent>
          <UserInfo>
            <img src="/images/user.svg" alt="" />
            <span> userName</span>
          </UserInfo>
          {/* <Editor>

</Editor> */}
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
          <PostButton>Post</PostButton>
        </SharedCreation>
      </Content>
    </Container>
  );
}
