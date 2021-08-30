import { Link } from 'react-router-dom';
import classes from './QuoteItem.module.css';

const QuoteItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link to={`/quotes/${props.id}`} className="btn">
        View Fullscreen
      </Link>
      {/* <a className='btn'>
        View Fullscreen
      </a> */}
    </li>
  );
};

export default QuoteItem;
