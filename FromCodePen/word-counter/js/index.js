const textArea = $("#input");
let topNum = Number($("#fre").val());
const results = $(".resultRow");
const list = $(".list");
const settings = $("#fre");
textArea.blur(count);
settings.change(function(){
  topNum = Number(this.value);
  count.call(textArea[0]);
});

function count(){
  let content = this.value.toString();
  let arr = content.replace(/[^a-zA-Z0-9]/g,' ').trim().split(/\s+/g);
  let temp_results = {};
  let topArr = [];
  arr.map(function(word,index,arr){
    if(temp_results.hasOwnProperty(word)){
      temp_results[word]++;
    }else{
      temp_results[word] = 0;
    }
  });
  for(key in temp_results){
    if(topArr.length === 0){
       topArr.unshift({
         'word':key,
         'time':temp_results[key]
       });
    }else{
      let unit = {
        'word':key,
        'time':temp_results[key]
      };
      let index = GPS(unit,topArr,0);
      topArr.splice(index,0,unit);
    }
  }
  results[0].innerText = '';
  results[1].innerText = '';
  list.empty();
  if(topArr.length>1){
    results[0].innerText = topArr.length+" words in total.";
    results[1].innerText = "There are the "+(topArr.length>=topNum?topNum:topArr.length)+" most frequently occurring words:";
    list.append(`
    <thead>
      <tr>
         <th>index</th>
         <th>Word</th>
         <th>Frequency</th>
      </tr>
    </thead>`);
    let temp = topArr.slice(0,topNum);
    for(key in temp){
      let obj = temp[key];
      list.append(`<tr>
      <td>`+(Number(key)+1)+`</td>
      <td>`+obj.word+`</td>
      <td>`+obj.time+`</td>
</tr>`);
    }
  }
}

function GPS(aim,arr,index){
  if(aim.time>=arr[index].time){
    return index;
  }else{
    return GPS(aim,arr,++index);
  }
}