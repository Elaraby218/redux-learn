import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addNewPost } from "./postSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState('idle'); 

  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers) ;



  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  
  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';
  
  const onSavePostClicked = () => {
    if (canSave) {
        try {
            setAddRequestStatus('pending')
            dispatch(addNewPost({ title, body: content, userId })).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
        } catch (err) {
            console.error('Failed to save the post', err)
        } finally {
            setAddRequestStatus('idle')
        }
    }

}

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  )) ; 



  return (
    <div className="FormSection">
      <h2> Add a New Post</h2>
      <form action="">
        <label htmlFor="postTitle"> Post Title </label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor">Author: </label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>


        <label htmlFor="postContent"> Post Content </label>
        <input
          type="text"
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;
