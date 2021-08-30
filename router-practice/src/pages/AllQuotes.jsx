import React, { useEffect } from 'react';
import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';
const DUMMY_QUOTES = [
    {id: 'q1', author: 'Max', text: 'Learning react!'},
    {id: 'q2', author: 'Maximax', text: 'Learning react!'} 
]
const AllQuotes = () => {
    const { sendRequest, status, data: loadedQuotes , error } = useHttp(getAllQuotes, true);
    useEffect(() => {
        sendRequest();
    }, [sendRequest]);
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

    if(status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
        return <NoQuotesFound/>;
    }
    return (
        <div>
            <QuoteList quotes={loadedQuotes}/>
        </div>
    )
}

export default AllQuotes;