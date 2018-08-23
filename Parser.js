//Null Parser
const nullParser = function( data )
{
  if( data.trim().indexOf("null") == 0 )
   return ([null, data.trim().slice(4)]);
  return null ;
}


//Boolean Parser
const booleanParser = function( data )
{
  if( data.trim().indexOf("true") == 0 || data.trim().indexOf("false") == 0 )
    {
      if( data.trim()[0] == 't')
        return ([true, data.trim().slice(4,data.length)]);
      return ([false, data.trim().slice(4,data.length)]);
    }
  return null;
}


//Number Parser
const numberParser = function( data )
{
  let rE = /[-]?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/;
  let result = rE.exec(data.trim());
  if ( result != null && result.index == 0 )
    return ([Number(result[0]), data.trim().slice(result[0].length)]);
  return null;
}


//String Parser
const stringParser = function( data )
{
  let i = 1, internal = '';
  if( data[0] == '"'){
    internal = internal.concat('"');
      while( i < data.length )
  {
    if( data[i] == '"' && data[i-1] != '\\')
    {
      internal = internal.concat(data[i]);
      return [internal, data.slice(internal.length)];
    }
    if( data[i] != '\\' )
      internal = internal.concat(data[i]);
    else if( data[i] == '\\' )
    {
      switch (data[i+1]){
        case '\\' : internal += '\\'; break;
        case '"' : internal += '\"'; break;
        case '/' : internal += '\/'; break;
        case 'b' : internal += '\b'; break;
        case 'f' : internal += '\f'; break;
        case 'n' : internal += '\n'; break;
        case 'r' : internal += '\r'; break;
        case 't' : internal += '\t'; break;
        default : return null;
      }
      i++;
    }
    else {
      return null;
    }
    i++;
  }
    if( internal[internal.length-1] != '"' )
      return null;
    return [internal, data.slice(internal.length)];
  }
  else {
    return null;
  }
}//end of stringParser


//Array Parser
const arrayParser = function( data )
{
  data = data.trim();
  data = eliminatingSpace( data );
  let i = 0, intermediate =  [], result = [];

  while( data != '' )
{
  if( data[i] == '[' )
  {
    if( data[i+1] == ',')
      return null;
    else if( data[i+1] == ']' )
      return [result, data.slice(i+2)];
    else
      {
        intermediate =  parsingLegend(data.slice(i+1));
        if( intermediate == -1 )
          return null;
          result.push(intermediate[0]);
      }
  }
  else if( data[i] == ',' )
  {
    if( data[i+1] == ']' )
      return null;
    else if( data[i+1] == ',' )
      return null;
    else
    {
        intermediate =  parsingLegend(data.slice(i+1));
        if( intermediate == -1 )
          return null;
        //else if( intermediate[1] != '' )
        //{
          result.push(intermediate[0]);
    }
  }
        else if( data[i] === ']' )
          return [result, data.slice(i+1)];
        else
          return null;
        data = intermediate[1];
}//end of while loop
      return [result, ''];
}//end of arrayParser


//Object Parser
const objectParser = function( data )
{
  data = data.trim();
  data = eliminatingSpace( data );
  let result = {}, name = [], value = [], i = 0;
  while( data != '' )
  {
    if( data[i] == '{' )
    {
      if( data[i+1] == ':' || data[i+1] == ',' )
        return null;
      if( data[i+1] == '}' )
        return [result, data.slice(i+2)];
      name =  parsingLegend(data.slice(i+1));

      if( name == null || name[1][0] != ':' )
        return null;
      value =  parsingLegend(name[1].slice(1));

      if( value == -1 )
        return null;
      result[name[0]] = value[0];
    }

    else if( data[i] == ',' )
    {
      if( data[i+1] == ':' || data[i+1] == ',' || data[i+1] == '}' )
        return null;
      name =  parsingLegend(data.slice(i+1));
      if( name == null || name[1][0] != ':' )
        return null;
      value =  parsingLegend(name[1].slice(1));
      if( value == -1 )
        return null;
      result[name[0]] = value[0];
    }

    else if( data[i] == '}' )
      return [result, data.slice(i+1)];
    else {
      return null;
    }
    data = value[1];
  }//end of while loop
  return [result, ''];
}//end of Object Parser


//removing all white spaces (except in string!)
function eliminatingSpace( data )
{
  let array = data.split("");
  let quoteCount = 0;
  for( let i = 0; i < array.length; i++ )
  {
    if( array[i] == ' ' && quoteCount % 2 == 0 )
    {
      array.splice(i,1);
      i--;
    }
    else if( array[i] == '"' && array[i-1] != '\\' )
    {
      quoteCount++;
    }
  }//end of for loop
  data = array.join("");
  return data;
}


//Factory parser function
function  parsingLegend( data )
{
  data = data.trim();
  let result;
  if( data[0] == 'n' )
  {
    if( (result = nullParser(data)) != null )
      return result;
  }
  if( data[0] == 't' || data[0] == 'f' )
  {
    if( (result = booleanParser(data)) != null )
      return result;
  }
  if( data[0] == '"' )
  {
    if( (result = stringParser(data)) != null )
      return result;
  }
  if( data[0] == '[' )
  {
    if( (result =  arrayParser(data)) != null )
      return result;
  }
  if( data[0] == '{' )
  {
    if( (result = objectParser(data)) != null )
      return result;
  }
  if( (result = numberParser(data)) != null )
  {
      return result;
  }
  console.log("Invalid Format : Cannot be parsed");
  return -1;
}

//**********DO NOT DISTURB THE ABOVE CODE**********//
//Replace /*Your Input JSON*/ with your input - Happy Parsing ;-)
let parsedResult;
parsedResult = parsingLegend(' /*Your Input JSON*/ ');
console.log(parsedResult);
