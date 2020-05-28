import React from "react";

export default class App extends React.Component
{

  constructor(props)
  {
    super();
    this.state={
      userinput:'',
      list: [],
      length: 0
    }
  }


  setInput(input)
  {
    this.setState({userinput:input});
  }


  addList(item)
  {
    var l=this.state.length;
    l=l+1;
    let temp=this.state.list;
    temp.push(item);
    this.setState({list:temp});
    this.setState({length:l});
    this.listitem.value='';
    
  }



  async reArrange(e)
  {
    const removeId = e.target.getAttribute("checkboxid");

    let items=this.state.list;
    var temp=items[this.state.length-1];
    items[this.state.length-1]=items[removeId];
    items[removeId]=temp;
    this.setState({list:items});
    e.target.checked = false; // remove tick
    

    
  }

removeButton(e)
{

  //remove button for completed tasks
  
  var ancestor =  this.divitem; //using ref of parent div
  ancestor.getElementsByTagName('LI')[this.state.length-1].style.textDecoration = "line-through";
  ancestor.getElementsByTagName('INPUT')[this.state.length-1].remove(); //removing the last checkbox
                                                                
  
  let l=this.state.length;
  l=l-1;
  this.setState({length:l})

  //check if list is empty
  if(this.state.length===1)
  {
    console.log("stop");
    let emptyArr=this.state.list;
    emptyArr.length=0;
    this.setState({list:emptyArr});
  }

  
}





  render()
  {
    
  return(<div >
      <input value={this.state.input} onChange={(e)=>{this.setInput(e.target.value)}} ref={(input)=>{this.listitem=input}} ></input>
      <button onClick={()=>this.addList(this.state.userinput)}>ADD</button>

      <div ref={(input)=>{this.divitem=input}}>
        {this.state.list.map((val,index)=>
        <div key={index}>
          <li>{val}<input type="checkbox" id="myCheck" checkboxid={index}  onChange={(e)=>this.reArrange(e) && this.removeButton(e)} ref={(input)=>{this.listbuttonlast=input}}></input></li>
        </div>)
        }
      </div>
    </div>);
  }
}


