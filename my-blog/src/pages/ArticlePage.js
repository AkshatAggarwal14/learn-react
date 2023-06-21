import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser';
import articles from './article-content';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({
        upvotes: 0,
        comments: [],
        canUpvote: false,
    });

    const { canUpvote } = articleInfo;
    const { articleId } = useParams();
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && (await user.getIdToken());
            const headers = token ? { authToken: token } : {};
            //! we can write shorthand here! as we set proxy in package.json!
            const response = await axios.get(`/api/articles/${articleId}`, {
                headers,
            });

            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        };

        if (!isLoading) {
            loadArticleInfo();
        }

        // we need to add dependency here to prevent infinite calls as data changes!
    }, [isLoading, user, articleId]);

    const article = articles.find((article) => article.name === articleId);

    const addUpvote = async () => {
        const token = user && (await user.getIdToken());
        const headers = token ? { authToken: token } : {};
        const response = await axios.put(
            `/api/articles/${articleId}/upvote`,
            null,
            { headers }
        );
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    };

    if (!article) {
        return <NotFoundPage />;
    }

    return (
        // Only 1 top level element - React.Fragment
        <>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
                {user ? (
                    <button onClick={addUpvote}>
                        {canUpvote ? 'Upvote' : 'Already Upvoted'}
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            navigate('/signin');
                        }}
                    >
                        Sign In to Upvote!
                    </button>
                )}
                <p>This article has {articleInfo.upvotes} upvote(s).</p>
            </div>
            {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            {user ? (
                <AddCommentForm
                    articleName={articleId}
                    onArticleUpdated={(updatedArticle) =>
                        setArticleInfo(updatedArticle)
                    }
                />
            ) : (
                <button
                    onClick={() => {
                        navigate('/signin');
                    }}
                >
                    Sign In to add a comment!
                </button>
            )}

            <CommentsList comments={articleInfo.comments} />
        </>
    );
};

export default ArticlePage;
