import React, { useEffect } from 'react'
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'

const QuoteDetail = () => {
    const match = useRouteMatch();
    const params = useParams();
    const {quoteId} = params;
    // const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);
    const { sendRequest, status, data: quote, error} = useHttp(getSingleQuote, true);
    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);
    if(status === 'pending') {
        <LoadingSpinner/>
    }
    if(status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner/>
            </div>
        )
    }
    if(error) {
        return <p className="centered focusd">{error}</p>
    }
    if(!quote) {
        return <p>No quote found</p>
    };
    return (
        <div>
            <HighlightedQuote text={quote.text} author={quote.author}/>
            {/* <p>{params.quoteId}</p> */}
            <Route path={`${match.path}`} exact>
                <div className="centered">
                    <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>
            
            {/* <Route path={`/quotes/${params.quoteId}/comments`}> */}
            <Route path={`${match.path}/comments`}>
                <Comments/>
            </Route>
        </div>
    )
}

export default QuoteDetail;
