import React, {Component} from 'react';
import classNames from 'classnames';
import './TodoItem.css';
class TodoItem extends Component {
    // constructor(props) {
    //     super(props);
    //     this.onItemClick = this.onItemClick.bind(this);//ráng mà hiểu
    // }
    // onItemClick() {
    //     console.log(this.props.item);//this này không phải context của class TodoItem mà là của hàm => ko lấy props được
    // }
    render(){
        const { item, onClick } = this.props;
        var className = "TodoItem";
        if(item.isComplete){
            // className += " active";
        }
        return (
            <div onClick={onClick} className={classNames('TodoItem', {
                'TodoItem-complete':item.isComplete
            })}>
                <p>{item.name}</p>
            </div>
        );
    }
}

export default TodoItem;
