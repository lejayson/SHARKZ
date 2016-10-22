function toPages(table, itemPerPage){
  var numPage = 0;
  var arr = [];
  var tmp = [];
  var count = 0;

  numPage = table.length/itemPerPage;

  for (i = 0; i < numPage; i++){
    for (j = 0; j < itemPerPage; j++){
      if(table[count]){
          tmp.push(table.$getRecord(count));
      }
      count++;
    }
    arr.push(tmp);
    tmp = [];
  }
  console.log(arr);
  return arr;
}

function increase(num, max){
  if(num < max){
    num = num + 1;
  }
  return num;
}

function decrease(num){
  if(num > 0){
    num = num - 1;
  }
  return num;
}
