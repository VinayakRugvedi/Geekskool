//Twisted Pyramid
function printTriangle( string, height ){
  let chars = 1, leftToRight  = true, currentIndex = 0
  while( height !== 0 ){
    let noOfSpaces = height - 1
    let lineString = ''
    while( noOfSpaces !== 0 ){
      lineString += " "
      noOfSpaces--
    }
    lineString = getTheCharacters( string, lineString, chars, leftToRight, currentIndex )
    currentIndex = (currentIndex + chars) % string.length
    if( leftToRight ) leftToRight = false
    else leftToRight = true
    chars += 2
    console.log(lineString)
    height--
  }//end of while
}

function getTheCharacters( string, lineString, chars, leftToRight, currentIndex ){
  if( leftToRight ){
    if( (currentIndex + chars - 1 ) < string.length )
      lineString += (string.slice(currentIndex, currentIndex + chars))
    else{
      lineString += (string.slice(currentIndex))
      chars -= (string.length - currentIndex)
        while( chars > 0 ){
          if( chars > string.length ) lineString += string.slice(0)
          else lineString += string.slice(0,chars)
          chars -= string.length
        }
    }
  }
  else{
    if( (currentIndex + chars - 1) < string.length )
      lineString += (string.slice(currentIndex, currentIndex + chars).split("").reverse().join(""))
    else{
      let tempString = ''
      tempString += (string.slice(currentIndex))
      chars -= (string.length - currentIndex)
      while(chars > 0 ){
        if( chars > string.length) tempString += (string.slice(0))
        else tempString += string.slice(0,chars)
        chars -= string.length
      }
      lineString += tempString.split("").reverse().join("")
    }
  }
  return lineString
}

printTriangle( "GEEKSKOOL", 10)
