import React, { useState } from 'react';


<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
const CommentBoard = () => {
 const [user1, setUser1] = useState('');
 const [user2, setUser2] = useState('');
 const [comments, setComments] = useState([]);


<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
 {comments.map((comment, index) => (
=======
{comments.map((comment, index) => (
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
onChange={(event) => setUser2(event.target.value)}
/>
=======
 onChange={(event) => setUser2(event.target.value)}
 />
>>>>>>> Stashed changes
<button type="submit">Post Comment</button>
</form>
</div>
 );
};



export default CommentBoard;