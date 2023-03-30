import React from "react";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import useAuthContext from "../../hooks/useAuthContext";

const propertyDetails = () => {
  const { id } = useParams();
  const { token } = useAuthContext();
  const [{ loading, data, error }] = useAxios({
    url: `/property/${id}`,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return null; // change this dependent on if we need to return. Should page
  // be accessible if we haven't hit a property value in the previous path.

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <div>
      <div>
        <h1>{data.property.address}</h1>
        <h1>{data.property.reviews[0].author.firstName}</h1>
      </div>
    </div>
  );
};

export default propertyDetails;

// const CommentList = ({ comments }) => {

//   return (
//     <div data-cy="comment-list">
//       <div className="my-6 flex flex-col gap-4">
//         <p className="text-lg font-semibold">Comments</p>
//         {comments.length > 0
//           ? comments.map((comment) => (
//               <Comment comment={comment} key={comment.id} />

//               // Comment component functionality \/
//               const Comment = ({ comment }) => {
//                 const formatDate = () => {
//                   const date = new Date(comment.createdAt);
//                   const formattedDate = contextualTime(date);
//                   return <p className="text-sm text-gray-500">{formattedDate}</p>;
//                 };

//                 return (
//                   <div
//                     data-cy="comment"
//                     className="flex flex-col rounded-md border border-gray-200 p-4 transition-all hover:bg-gray-100"
//                   >
//                     <div className="flex items-center gap-4">
//                       <ProfilePicture
//                         className="h-10 w-10"
//                         publicId={comment.authorImageId}
//                       />
//                       <div>
//                         <p className="text-lg font-semibold capitalize">
//                           {comment.authorName}
//                         </p>
//                         {formatDate()}
//                       </div>
//                     </div>
//                     <div className="mx-2 p-2 text-base">{comment.message}</div>
//                   </div>
//                 );
//               };
//             ))
//           : emptyComments()}
//       </div>
//     </div>
//   );
// };

// CommentList.propTypes = {
//   comments: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string,
//       message: PropTypes.string,
//       authorName: PropTypes.string,
//       createdAt: PropTypes.string,
//       likes: PropTypes.arrayOf(PropTypes.string),
//     })
//   ).isRequired,
// };

// export default CommentList;
