import React, { useState } from 'react';



const CommentBoard = () => {
 const [user1, setUser1] = useState('');
 const [user2, setUser2] = useState('');
 const [comments, setComments] = useState([]);


 const handleSubmit = (event) => {
 event.preventDefault();
 const comment = {
 user: user1 ? 'User 1' : 'User 2',
 message: user1 ? user1 : user2,
 };
 setComments([...comments, comment]);
 setUser1('');
 setUser2('');
 };



 return (
<div>
<h1>Comment Board</h1>
<div>
{comments.map((comment, index) => (
<div key={index}>
<strong>{comment.user}: </strong>
<span>{comment.message}</span>
</div>
 ))}
</div>
<form onSubmit={handleSubmit}>
<label htmlFor="user1">User 1:</label>
<input
 type="text"
 id="user1"
 value={user1}
 onChange={(event) => setUser1(event.target.value)}
 />
<label htmlFor="user2">User 2:</label>
<input
 type="text"
 id="user2"
 value={user2}
 onChange={(event) => setUser2(event.target.value)}
 />
<button type="submit">Post Comment</button>
</form>
</div>
 );
};

 

export default CommentBoard;