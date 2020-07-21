const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
const os=require('os');
const path = require('path');
const UserCPUCount=os.cpus().length;
const workerPath = path.resolve('factorial-worker.js');


const calculateFactorial=async(number)=>{
  if(number==0){
    return 1;
  }
  return new Promise(async(ParentResolve,parentReject)=>{
    const numbers=[...new Array(number)].map((_,i)=>i+1)

    const segmentSize=Math.ceil(numbers.length/UserCPUCount);
    const segments=[]

    console.log(numbers.length+" "+UserCPUCount+" "+segmentSize)

    for(let segmentIndex=0;segmentIndex<UserCPUCount;segmentIndex++)
    {
      const start=segmentIndex*segmentSize;
      const end=start+segmentSize;
      const segment=numbers.slice(start,end);
      segments.push(segment);
    }

    const results =await Promise.all(
    segments.map(
      segment =>
        new Promise((resolve, reject) => {
          const worker = new Worker(workerPath, {
            workerData: segment,
          });
          worker.on('message', resolve);
          worker.on('error', reject);
          worker.on('exit', code => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
          });
        })
    ))

    const finalResult=results.reduce((acc,val)=>acc*val,1);
    console.log(finalResult)
  })
  
 

}

calculateFactorial(10);