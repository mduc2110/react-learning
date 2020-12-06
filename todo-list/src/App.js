
import './App.css';
import './component/TodoItem'
import TodoItem from './component/TodoItem';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      state2: "hehehehehehhe",
      todoItems: [
        {name: "Duc", isComplete: true},
        {name: "Duc", isComplete: false},
        {name: "Duc", isComplete: true}
      ]
    }
  }
  onItemClick(item) {
    // console.log("Item clicked", item);//Bị log ra 3 lần là do lúc gọi hàm bên dưới có(item) nên hàm dc gọi từ trước
    return (event) =>{//phải trả về một hàm arrow function lúc click vào
      console.log(item);// sau khi return 1 hàm thì sự kiện chỉ xảy ra khi ta click
      const isComplete = item.isComplete;//trạng thái hiện tại
      const {todoItems} = this.state;//destructuring lấy ra giá trị của state trước (cho gọn)
      const index = todoItems.indexOf(item);// lấy ra vị trí của item đó ở trong mảng
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      })
    }
  }
  render(){
    const {todoItems} = this.state;
    if(todoItems.length){
      return (
        <div className="App">
            {
              todoItems.length && todoItems.map((item, index) => 
              (<TodoItem 
                key={index} 
                item={item} 
                onClick={this.onItemClick(item)}/>)//nếu hàm() thì sẽ tự động gọi khi được render ra.
                )
            }
        </div>
      );
    }
    
  }
  
}

export default App;
