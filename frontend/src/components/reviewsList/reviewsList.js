import React from "react";
import PropTypes from "prop-types";
import getPropertyReviews from "../../controllers/property";
import axios from "axios";

const getPropertyReviews = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  
  const property = new URLSearchParams(window.location.search)
   const type = type
   const id = queryParameters.get(id)

 

  const getPropertyById = () => {
    const { token } = useAuthContext();
    
    const [{ loading, data, error }] = useAxios({
      url: `/property/property?id=${propertyId}`,
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      params: {
        address: queryParameters.get("id"),
      },
    });
  }

  const getPropertyById = async (property.id) => {
    try {
      const response = await axios.get(`/property?id=${propertyId}`);
      return response.data.property;
    } catch (error) {
      console.error(error);
    }
  }
}


const PropertyDetails = () => {
  const location = useLocation();
  const propertyId = new URLSearchParams(location.search).get("id");
  const { token } = useAuthContext();
  const [{ loading, data, error }, getPropertyById] = useAxios({
    url: `/property/property?id=${propertyId}`,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    getPropertyById();
  }, [getPropertyById]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default PropertyDetails;



const CommentList = ({ comments }) => {
  
  return (
    <div data-cy="comment-list">
      <div className="my-6 flex flex-col gap-4">
        <p className="text-lg font-semibold">Comments</p>
        {comments.length > 0
          ? comments.map((comment) => (
              <Comment comment={comment} key={comment.id} />

              // Comment component functionality \/
              const Comment = ({ comment }) => {
                const formatDate = () => {
                  const date = new Date(comment.createdAt);
                  const formattedDate = contextualTime(date);
                  return <p className="text-sm text-gray-500">{formattedDate}</p>;
                };
              
                return (
                  <div
                    data-cy="comment"
                    className="flex flex-col rounded-md border border-gray-200 p-4 transition-all hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <ProfilePicture
                        className="h-10 w-10"
                        publicId={comment.authorImageId}
                      />
                      <div>
                        <p className="text-lg font-semibold capitalize">
                          {comment.authorName}
                        </p>
                        {formatDate()}
                      </div>
                    </div>
                    <div className="mx-2 p-2 text-base">{comment.message}</div>
                  </div>
                );
              };
            ))
          : emptyComments()}
      </div>
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.string,
      authorName: PropTypes.string,
      createdAt: PropTypes.string,
      likes: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default CommentList;
