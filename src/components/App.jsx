import React from "react";

export default class App extends React.Component
{
  constructor(props)
  {
    super();
    this.state={
      userinput:'',
      list: []
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


  render()
  {

  return(<div>
      <input value={this.state.input} onChange={(e)=>{this.setInput(e.target.value)}} ></input>
      <button onClick={()=>this.addList(this.state.userinput)}>ADD</button>

      <div>
        {this.state.list.map((val)=><li>{val}</li>)}
      </div>
    </div>);
  }
}


