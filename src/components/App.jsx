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
  }



  removeItem(e)
  {
    const removeId = e.target.getAttribute("newid"); //Im trying to identify the button pressed using newid.
    //const user = document.querySelctor("[newid='0']"); 
    //console.log(user); //based on newid I am selecting the li from the div 
    console.log(removeId); 
    
  }

  render()
  {
    let counter=0;

  return(<div>
      <input value={this.state.input} onChange={(e)=>{this.setInput(e.target.value)}} ></input>
      <button onClick={()=>this.addList(this.state.userinput)}>ADD</button>

      <div>
        {this.state.list.map((val)=>
        <div>
          <li>{val}<input type="checkbox" id="myCheck" newid={counter++}  onChange={(e)=>this.removeItem(e)}></input></li>
        </div>)
        }
      </div>
    </div>);
  }
}


