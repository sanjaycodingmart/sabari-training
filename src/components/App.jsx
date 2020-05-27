import React from "react";

export default class App extends React.Component
{
  constructor(props)
  {
    super();
    this.state={
      userinput:'',
      list: [],
      key: 0
    }
  }


  setInput(input)
  {
    this.setState({userinput:input});
  }


  addList(item)
  {
    let temp=this.state.list;
    temp.push(item);
    this.setState({list:temp});
   

    //increment key
    var count=this.state.key;
    count=count+1;
    this.setState({key:count});
    console.log("key"+this.state.key);  //why is the state.key not incremented like the count bro?
  }



  removeItem(e)
  {
    //var checkBox = document.getElementById("myCheck");
    //if (checkBox.checked === true){
      //console.log(value);
      
    //}
    console.log(e.target.getAttribute("newid")); //unable to get the value of newid of previous items from checkbox bro
  }

  render()
  {

  return(<div>
      <input value={this.state.input} onChange={(e)=>{this.setInput(e.target.value)}} ></input>
      <button onClick={()=>this.addList(this.state.userinput)}>ADD</button>

      <div>
        {this.state.list.map((val)=>
        <div>
          <li>{val}<input type="checkbox" id="myCheck" newid={this.state.key} onChange={(e)=>this.removeItem(e)}></input></li>
        </div>)
        }
      </div>
    </div>);
  }
}


