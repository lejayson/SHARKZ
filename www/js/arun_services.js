function toPages(table, itemPerPage){
  var numPage = 0;
  var arr = [];
  var tmp = [];
  var count = 0;
  numPage = table.length/itemPerPage;

  for (i = 0; i < numPage; i++){
    for (j = 0; j < itemPerPage; j++){
      if(table[count]){
          tmp.push(table[count]);
      }
      count++;
    }
    arr.push(tmp);
    tmp = [];
  }
  return arr;
}

function mergeTable(table1, table2){
  var arr = [];
  for(i=0; i<table1.length; i++){
    arr.push(table1.$getRecord(i));
  }
  for(j=0; j<table2.length; j++){
    arr.push(table2.$getRecord(j));
  }
  return arr;
}

function getAge(table){
  for(i=0; i < table.length; i++){
    if(table[i]){
      var DOB = table[i].DOB.split("/");
      var d = new Date();
      var y = 0;
      if(d.getMonth()< DOB[1]){
        y = 1;
      }else if(d.getMonth() == DOB[1] && d.getDate() < DOB[0]){
        y = 1;
      }
      table[i]["age"] = d.getFullYear()-DOB[2]-y;
    }
  }
  return table;
}

function setVet(table){
  for(i = 0; i < table.length; i++){
    if(table[i]){
      var vet = table[i].VeteranStatus;
      if(vet){
        table[i]["vet"] = "Veteran";
      }
      else {
        table[i]["vet"] = "individual";
      }
    }
  }
  return table;
}

function displaypic(table){
  for(i = 0; i < table.length; i++){
    if(table[i]){
      if(!table[i].male_beds && !table[i].female_beds){
         table[i]["image"] = "img\\nfnm.png";
      }else if(!table[i].male_beds && table[i].female_beds){
         table[i]["image"] = "img\\yfnm.png";
      }else if(table[i].male_beds && !table[i].female_beds){
         table[i]["image"] = "img\\nfym.png";
      }else {
         table[i]["image"] = "img\\yfym.png";
      }
    }
  }
  return table;
}

function increase(num, max){
  if(num < max){
    num = num + 1;
  }
  console.log(max);
  return num;
}

function decrease(num){
  if(num > 0){
    num = num - 1;
  }
  return num;
}
