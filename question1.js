/* 
Question 1: DSA Given an array of integers, 
return the length of the longest increasing subsequence. 
A subsequence is a sequence that can be derived from the array by deleting some or no elements 
 without changing the order 
of the remaining elements. For example, given the array [10, 9, 2, 5, 3, 7,
101, 18], the longest increasing subsequence is [2, 3, 7, 101], and its length is 4.
*/


let myindex = 0;

async function myAscSeqChecker(_ary){
    //console.log(".. _ary ...", _ary);
    myindex++;
    let tempStr = [];
    tempStr.push(_ary[0]);
    let firstElement = _ary[0];
    for(let i=1;i<=_ary.length; i++){
        let lastTempElement = tempStr[tempStr.length-1];
        if((firstElement < _ary[i]) && (lastTempElement < _ary[i])) {
            tempStr.push(_ary[i]);
            //console.log("... pushing ..");
            //console.log('... tempStr ..', tempStr);
        }else{
            // skip .. to next..
        }
    }

    return tempStr;
}



let ary =  [10, 9, 2, 5, 3, 7, 101, 18];
let flgStart = 0;
let lastCounter = 0;

let ImpressedAscSequencerCounterAry = [];
let bestSeq = [];
let z = ary.length;
let q = 0;
while(ary.length > 0){
        
    if(flgStart > 0){
        // remove firstelement eachTime except firsttime till end;
        let newary = ary.shift();
        let seq = await myAscSeqChecker(ary);
        if(lastCounter < seq.length){
            ImpressedAscSequencerCounterAry = seq; 
            //console.log(" ####>>>> ary, length",ImpressedAscSequencerCounterAry, ImpressedAscSequencerCounterAry.length);
            lastCounter = seq.length;
            bestSeq = seq;
        }
    }else{
        let seq = await myAscSeqChecker(ary);
        flgStart = 1;
        if(lastCounter < seq.length){
            ImpressedAscSequencerCounterAry = seq; 
            //console.log(" ####>>>> ary, length",ImpressedAscSequencerCounterAry, ImpressedAscSequencerCounterAry.length);
            lastCounter = seq.length;
            bestSeq = seq;
        }
    }
    q++;
    if(q == z){
        console.log(".. bestseq ...", bestSeq);
        console.log(".. ::: Length :::..", bestSeq.length);
    }
}


