var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
context.fillStyle = 'yellow';

var drawingBoardHeight = canvas.height;
var drawingBoardWidth = canvas.width;

function moveObjectToMiddle(width,height,pushX,pushY,color) {
    var objectHeight;
    var objectWidth;
    var objectY;
    var objectX;

    objectHeight = height;
    objectWidth = width;
    objectY = (drawingBoardHeight-objectHeight)/2+pushY;
    objectX = (drawingBoardWidth-objectWidth)/2+pushX;
    context.fillStyle = color;
    context.fillRect(objectX,objectY,objectWidth,objectHeight);
}
/*moveObjectToMiddle(100,150,0,0,'yellow');
moveObjectToMiddle(250,50,0,-50,'red');
moveObjectToMiddle(250,50,0,0,'white');
moveObjectToMiddle(250,50,0,50,'green');*/


function drawDiagonal (witchDiagonal,color) {
    var diagonalAPointX;
    var diagonalAPointY;
    var diagonalBPointX;
    var diagonalBPointY;

    if (witchDiagonal=='left') {
        diagonalAPointX = 0;
        diagonalAPointY = 0;
        diagonalBPointX = drawingBoardWidth;
        diagonalBPointY = drawingBoardHeight;
    } else if (witchDiagonal=='right') {
        diagonalAPointX = drawingBoardWidth;
        diagonalAPointY = 0;
        diagonalBPointX = 0;
        diagonalBPointY = drawingBoardHeight;
    } else {
        console.warn('Invalid input for drawDiagonal().');
    }

    context.beginPath();
    context.moveTo(diagonalAPointX,diagonalAPointY);
    context.lineTo(diagonalBPointX,diagonalBPointY);
    context.strokeStyle = color;
    context.stroke();
}
/*drawDiagonal('right', 'red');
drawDiagonal('left', 'red');*/

function drawBisector(witchBisector,paddingBefore,paddingAfter,color) {
    var bisectorAPointX;
    var bisectorAPointY;
    var bisectorBPointX;
    var bisectorBPointY;

    if (witchBisector == 'vertical') {
        bisectorAPointX = drawingBoardWidth/2;
        bisectorAPointY = paddingBefore;
        bisectorBPointX = drawingBoardWidth/2;
        bisectorBPointY = drawingBoardHeight+paddingAfter;
    } else if (witchBisector == 'horizontal') {
        bisectorAPointY = drawingBoardHeight/2;
        bisectorAPointX = paddingBefore;
        bisectorBPointY = drawingBoardHeight/2;
        bisectorBPointX = drawingBoardWidth-paddingAfter;
    } else {
        console.warn('Invalid input for drawBisector().');
    }

    context.beginPath();
    context.moveTo(bisectorAPointX,bisectorAPointY);
    context.lineTo(bisectorBPointX,bisectorBPointY);
    context.strokeStyle = color;
    context.stroke();
}
/*drawBisector('vertical',0,0,'green');
drawBisector('horizontal',0,0,'red');*/


function moveObjectToCorner(witchCorner,objectWidth,objectHeight,paddingX,paddingY,color) {
    var objectHeight;
    var objectWidth;
    var objectY;
    var objectX;

    if (witchCorner == 'topLeft') {
        objectX = 0+paddingX;
        objectY = 0+paddingY;
    } else if (witchCorner == 'topRight') {
        objectX = drawingBoardWidth-objectWidth-paddingX;
        objectY = 0+paddingY;
    } else if (witchCorner == 'bottomLeft') {
        objectX = 0+paddingX;
        objectY = drawingBoardHeight-objectHeight-paddingY;
    } else if (witchCorner == 'bottomRight') {
        objectX = drawingBoardWidth-objectWidth-paddingX;
        objectY = drawingBoardHeight-objectHeight-paddingY;
    } else {
        console.warn('Invalid input for moveObjectToCorner().');
    }

    context.fillStyle = color;
    context.fillRect(objectX,objectY,objectWidth,objectHeight);
}
/*moveObjectToCorner('bottomRight',drawingBoardWidth/2,drawingBoardHeight/2,0,0,'black');
moveObjectToCorner('topLeft',100,100,155,80,'rgba(255,0,0,.5');
moveObjectToCorner('bottomRight',100,100,155,80,'rgba(0,0,255,.5');*/
function drawRectangles (witchCorner,objectWidth,objectHeight,paddingX,paddingY,howMany,color) {
    var objectX=paddingX;
    var objectY=paddingY;
    var i=0;
    moveObjectToCorner(witchCorner,objectWidth,objectHeight,objectX,objectY,color);
    while (i<howMany-1) {
        objectX = objectX+objectWidth/2;
        objectY = objectY+objectHeight/2;
        moveObjectToCorner(witchCorner,objectWidth,objectHeight,objectX,objectY,color);
        i++;
    }
}
/*drawRectangles ('topLeft',45,45,20,20,10,'rgba(255,165,0,.5)');*/

function drawRectanglesToTriangle(witchCorner,objectWidth,objectHeight,paddingX,paddingY,columnPadding,linePadding,howManyLine,color) {
    var objectX=paddingX;
    var objectY=paddingY;
    howManyLine=howManyLine-2;

    var i=0;
    var i2=-1;
    howManyLine++;
    moveObjectToCorner(witchCorner,objectWidth,objectHeight,objectX,objectY,color);
    while (i<howManyLine) {
        i2=-1;
        objectY=objectY+objectHeight+linePadding;
        moveObjectToCorner(witchCorner,objectWidth,objectHeight,objectX,objectY,color);
        while (i2<i) {
            objectX=objectX+objectWidth+columnPadding;
            moveObjectToCorner(witchCorner,objectWidth,objectHeight,objectX,objectY,color);
            i2++;
        }
        objectX=paddingX;
        i++;
    }
}
/*drawRectanglesToTriangle('topLeft',45,45,15,15,5,5,5,'rgba(255,165,0,.5)');*/

function drawRectanglesToRectangle(witchCorner,objectWidth,objectHeight,paddingX,paddingY,columnPadding,linePadding,howManyLine,colorR,colorG,colorB,opacity) {
    var objectX=paddingX;
    var objectY=paddingY;
    howManyLine=howManyLine-2;

    var i=0;
    var i2=-1;
    howManyLine++;
    moveObjectToCorner(witchCorner,objectWidth,objectHeight,objectX,objectY,'rgb('+colorR+', '+colorG+', '+colorB+', '+opacity+')');
    colorR=colorR-7;
    while (i2<howManyLine-1) {
        objectY=paddingY;
        objectX=pobjectX=objectX+objectWidth+columnPadding;
        moveObjectToCorner(witchCorner,objectWidth,objectHeight,objectX,objectY,'rgb('+colorR+', '+colorG+', '+colorB+', '+opacity+')');
        colorR=colorR-7;
        i2++;
    }
    colorB=colorB+15;
    i2=-1;
    objectX=paddingX;
    while (i<howManyLine) {
        i2=-1;
        objectY=objectY+objectHeight+linePadding;
        moveObjectToCorner(witchCorner,objectWidth,objectHeight,objectX,objectY,'rgb('+colorR+', '+colorG+', '+colorB+', '+opacity+')');
        colorR=colorR-7;
        colorB=colorB+15;
        while (i2<howManyLine-1) {
            objectX=objectX+objectWidth+columnPadding;
            moveObjectToCorner(witchCorner,objectWidth,objectHeight,objectX,objectY,'rgb('+colorR+', '+colorG+', '+colorB+', '+opacity+')');
            colorR=colorR-7;
            i2++;
        }
        objectX=paddingX;
        i++;
    }
}
/*drawRectanglesToRectangle('topLeft',30,30,125,50,5,5,5,255,79,120,.5);*/

function drawTriangle(width,height,pushX,pushY,apexPush,isMiddle,direction,fillColor,lineColor) {
    var objectY;
    var objectX;
    var lineAPointX;
    var lineAPointY;
    var lineBPointX;
    var lineBPointY;
    var lineCPointX;
    var lineCPointY;
    if (isMiddle == true) {
        objectX = (drawingBoardWidth-width)/2;
        objectY = (drawingBoardHeight-height)/2;
    } else if (isMiddle == false) {
        objectX = 0;
        objectY = 0;
    } else {
        console.warn('Invalid isMiddle input for drawTriangle().');
    }
    if (direction == 'top') {
        lineAPointX = (width/2)+apexPush;
        lineAPointY = 0;

        lineBPointX = width;
        lineBPointY = height;

        lineCPointX = 0;
        lineCPointY = height;
    } else if (direction == 'right') {
        lineAPointX = 0;
        lineAPointY = 0;

        lineBPointX = width;
        lineBPointY = (height/2)+apexPush;

        lineCPointX = 0;
        lineCPointY = height;
    } else if (direction == 'bottom') {
        lineAPointX = 0;
        lineAPointY = 0;

        lineBPointX = width;
        lineBPointY = 0;

        lineCPointX = (width/2)+apexPush;
        lineCPointY = height;
    } else if (direction == 'left') {
        lineAPointX = 0;
        lineAPointY = (width/2)+apexPush;

        lineBPointX = width;
        lineBPointY = 0;

        lineCPointX = width;
        lineCPointY = height; 
    } else {
        console.warn('Invalid direction input for drawTriangle().');
    }

    lineAPointX = lineAPointX+pushX+objectX;
    lineAPointY = lineAPointY+pushY+objectY;
    lineBPointX = lineBPointX+pushX+objectX;
    lineBPointY = lineBPointY+pushY+objectY;
    lineCPointX = lineCPointX+pushX+objectX;
    lineCPointY = lineCPointY+pushY+objectY;

    context.beginPath();
    context.moveTo(lineAPointX,lineAPointY);
    context.lineTo(lineBPointX,lineBPointY);
    context.lineTo(lineCPointX,lineCPointY);
    context.lineTo(lineAPointX,lineAPointY);
    context.strokeStyle = lineColor;
    context.stroke();
    context.fillStyle = fillColor;
    context.fill();
}
/*drawTriangle (150,150,150,75,0,false,'top','rgba(255,165,0,.5)','rgba(128,128,128,.5)');*/

function drawLotOfTriangle(width,height,pushX,pushY,apexPush,isMiddle,direction,fillColor,lineColor,howMany,pushFromTheLastObjectX,pushFromTheLastObjectY,copyDirection) {
    var i=0;
    var objectX=pushX;
    var objectY=pushY;
    while (i<howMany) {
        drawTriangle (width,height,objectX,objectY,apexPush,isMiddle,direction,fillColor,lineColor);
        if (copyDirection == 'topLeft') {
            objectX=objectX-pushFromTheLastObjectX;
            objectY=objectY-pushFromTheLastObjectY;
        } else if(copyDirection == 'topRight') {
            objectX=objectX+pushFromTheLastObjectX;
            objectY=objectY-pushFromTheLastObjectY;
        } else if(copyDirection == 'bottomLeft') {
            objectX=objectX-pushFromTheLastObjectX;
            objectY=objectY+pushFromTheLastObjectY;
        } else if(copyDirection == 'bottomRight') {
            objectX=objectX+pushFromTheLastObjectX;
            objectY=objectY+pushFromTheLastObjectY;
        } else {
            console.warn('Invalid input for drawLotOfTriangle().');
        }
        i++;
    }
}
/*drawLotOfTriangle (100,100,120,20,0,false,'top','rgba(255,165,0,0)','rgba(128,128,128,1)',30,5,5,'bottomRight');*/

function coloredRectangles(width,height,pushX,pushY,howMany,hue,saturation,lightness) {
    var i = 0;
    while (i < howMany) {
        console.log(i);
        moveObjectToMiddle(width,height,pushX,pushY,'hsl('+hue+', '+saturation+'%, '+lightness+'%)');
        hue=hue-360/17;
        width=width-10;
        height=height-10;
        i++;
    }
}
/*coloredRectangles(drawingBoardWidth,drawingBoardHeight,0,0,17,360,60,45);*/

function drawColoredRectangles (witchCorner,objectWidth,objectHeight,paddingX,paddingY,howMany) {
    var objectX=paddingX;
    var objectY=paddingY;
    var i=1;
    color = getColorForDrawColoredRectangles(i);
    moveObjectToCorner(witchCorner,objectWidth,objectHeight,objectX,objectY,color);
    i++;
    while (i<howMany+1) {
        objectX = objectX+paddingX;
        objectY = objectY+paddingY;
        color = getColorForDrawColoredRectangles(i);
        moveObjectToCorner(witchCorner,objectWidth,objectHeight,objectX,objectY,color);
        i++;
        console.log(i);
    }
}
/*drawColoredRectangles ('topLeft',50,50,20,15,15);*/

function getColorForDrawColoredRectangles(i) {
    if (i%3 == 0 && i%5 == 0) {
        return 'rgba(0,255,0,.5)';
    } else if (i%3 == 0) {
        return 'rgba(0,0,255,.5)';
    } else if (i%5 == 0) {
        return 'rgba(255,255,0,.5)';
    } else {
        return 'rgba(0,0,0,.5)';
    }
}

function drawLotOfLineToTwoPoints(color,direction,density) {
    var startX;
    var startY;
    var end1X;
    var end1Y;
    var end2X;
    var end2Y;
    var endX;
    var endY;
    var i;

    if (direction == 'horizontal') {
        startX = 0;
        startY = drawingBoardHeight/2;
        end1X = drawingBoardWidth/2;
        end1Y = 0;
        end2X = drawingBoardWidth/2;
        end2Y = drawingBoardHeight;
        i=0;
        endX = drawingBoardWidth/2;
        while (i <= drawingBoardWidth) {
            startX=i;
            context.beginPath();
            context.moveTo(startX,startY);
            if (startX%2 == 0) {
                endY = end1Y;
            } else {
                endY = end2Y;
            }
            context.lineTo(endX,endY);
            context.strokeStyle = color;
            context.stroke();
            i += density;
        }
    } else if (direction == 'vertical') {
        startX = drawingBoardWidth/2;
        startY = 0;
        end1X = 0;
        end1Y = drawingBoardHeight/2;
        end2X = drawingBoardWidth;
        end2Y = drawingBoardHeight/2;
        i=0;
        endY = drawingBoardHeight/2;
        while (i <= drawingBoardHeight) {
            startY=i;
            context.beginPath();
            context.moveTo(startX,startY);
            if (startY%2 == 0) {
                endX = end1X;
            } else {
                endX = end2X;
            }
            context.lineTo(endX,endY);
            context.strokeStyle = color;
            context.stroke();
            i += density;
        }
    } else {
        console.warn('Invalid input for drawLotOfLine().');
    }
}
/*drawLotOfLineToTwoPoints('rgba(255,0,0,.5)','horizontal',3);*/

function drawLotOfLineFromMiddle(color,direction,density) {
    var objectX=paddingX;
    var objectY=paddingY;
    var i=1;
    color = getColorForDrawColoredRectangles(i);
    moveObjectToCorner(witchCorner,objectWidth,objectHeight,objectX,objectY,color);
    i++;
    while (i<howMany+1) {
        objectX = objectX+paddingX;
        objectY = objectY+paddingY;
        color = getColorForDrawColoredRectangles(i);
        moveObjectToCorner(witchCorner,objectWidth,objectHeight,objectX,objectY,color);
        i++;
        console.log(i);
    }
}
/*drawColoredRectangles ('topLeft',50,50,20,15,15);*/

function getColorForDrawColoredRectangles(i) {
    if (i%3 == 0 && i%5 == 0) {
        return 'rgba(0,255,0,.5)';
    } else if (i%3 == 0) {
        return 'rgba(0,0,255,.5)';
    } else if (i%5 == 0) {
        return 'rgba(255,255,0,.5)';
    } else {
        return 'rgba(0,0,0,.5)';
    }
}

function drawLotOfLineToFourPoints(color,direction,density) {
    var startX;
    var startY;
    var end1X;
    var end1Y;
    var end2X;
    var end2Y;
    var end3X;
    var end3Y;
    var end4X;
    var end4Y;
    var endX;
    var endY;
    var i;

    if (direction == 'horizontal') {
        startX = 0;
        startY = drawingBoardHeight/2;
        end1X = 0;
        end1Y = 0;
        end2X = drawingBoardWidth;
        end2Y = 0;
        end3X = 0;
        end3Y = drawingBoardHeight;
        end4X = drawingBoardWidth;
        end4Y = drawingBoardHeight;
        i=0;
        endX = drawingBoardWidth/2;
        while (i <= drawingBoardWidth) {
            startX=i;
            context.beginPath();
            context.moveTo(startX,startY);
            if (startX%4 == 0) {
                endX = end1X;
                endY = end1Y;
            } else if (startX%4 == 1) {
                endX = end2X;
                endY = end2Y;
            } else if (startX%4 == 2) {
                endX = end3X;
                endY = end3Y;
            } else {
                endX = end4X;
                endY = end4Y;
            }
            context.lineTo(endX,endY);
            context.strokeStyle = color;
            context.stroke();
            i += density;
        }
    } else if (direction == 'vertical') {
        startX = drawingBoardWidth/2;
        startY = 0;
        end1X = 0;
        end1Y = 0;
        end2X = drawingBoardWidth;
        end2Y = 0;
        end3X = 0;
        end3Y = drawingBoardHeight;
        end4X = drawingBoardWidth;
        end4Y = drawingBoardHeight;
        i=0;
        endX = drawingBoardWidth/2;
        while (i <= drawingBoardHeight) {
            startY=i;
            context.beginPath();
            context.moveTo(startX,startY);
            if (startY%4 == 0) {
                endX = end1X;
                endY = end1Y;
            } else if (startY%4 == 1) {
                endX = end2X;
                endY = end2Y;
            } else if (startY%4 == 2) {
                endX = end3X;
                endY = end3Y;
            } else {
                endX = end4X;
                endY = end4Y;
            }
            context.lineTo(endX,endY);
            context.strokeStyle = color;
            context.stroke();
            i += density;
        }
    } else {
        console.warn('Invalid input for drawLotOfLine().');
    }
}
/*drawLotOfLineToFourPoints('rgba(0,0,255,.5)','horizontal',1);*/

function triangle (positionX, positionY, size) { //This is a downgrded version of drawTriangle(). This use only 3 parameters, and the others are set automatically.
    //width,height,pushX,pushY,apexPush,isMiddle,direction,fillColor,lineColor
    drawTriangle (size,size,positionX,positionY,0,false,'top','rgba(255,165,0,.5)','rgba(0,0,0,.5)');
}
/*triangle(230, 160, 50);
triangle(270, 100, 50);
triangle(200, 50, 150);*/

function star(positionX, positionY, size) {
    var currentX;
    var currentY;
    context.beginPath();
    currentX = positionX+size/2;
    currentY = positionY;
    context.moveTo(currentX,currentY);
    currentX = currentX+size*(2/14);
    currentY = currentY+size*(5/14);
    context.lineTo(currentX,currentY);
    currentX = positionX+size;
    currentY = currentY+size*(0.5/14);
    context.lineTo(currentX,currentY);
    currentX = currentX-size*(3.5/14);
    currentY = positionY+size*(9/14);
    context.lineTo(currentX,currentY);
    currentX = currentX+size*(1.5/14);
    currentY = positionY+size;
    context.lineTo(currentX,currentY);
    currentX = positionX+size/2;
    currentY = positionY+size*(11.5/14);
    context.lineTo(currentX,currentY);
    currentX = positionX+size*(2/14);
    currentY = positionY+size;
    context.lineTo(currentX,currentY);
    currentX = currentX+size*(1.5/14);
    currentY = positionY+size*(9/14);
    context.lineTo(currentX,currentY);
    currentX = positionX;
    currentY = positionY+size*(5.5/14);
    context.lineTo(currentX,currentY);
    currentX = positionX+size*(5/14);
    currentY = currentY-size*(0.5/14);
    context.lineTo(currentX,currentY);
    currentX = positionX+size/2;
    currentY = positionY;
    context.lineTo(currentX,currentY);
    context.strokeStyle = 'rgb(233,159,184)';
    context.fillStyle = 'rgb(233,159,184)';
    context.fill()
    context.stroke();
}
/*star(40, 50, 75);
star(130, 120, 100);
star(250, 220, 150);*/

function random(max,min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function lineToCenter(positionX,positionY,color) {
    var endX = drawingBoardWidth/2;
    var endY = drawingBoardHeight/2;

    context.moveTo(positionX,positionY);
    context.lineTo(endX,endY);
    context.strokeStyle = color;
    context.stroke();
}

function lotOfLineToCenter(color,howMany,) {
    var i = 0;
    while (i < howMany) {
        lineToCenter(random(drawingBoardWidth,0),random(drawingBoardHeight,0),color);
        i++;
    }
}
/*lotOfLineToCenter('teal',500);*/

function drawHexagon(positionX,positionY,isFilled) {
    var currentX;
    var currentY;
    var width = 113;
    var height = 98;
    context.beginPath();
    currentX = positionX+width/4;
    currentY = positionY;
    context.moveTo(currentX,currentY);
    currentX = currentX+width/2;
    context.lineTo(currentX,currentY);
    currentX = currentX+width/4;
    currentY = currentY+height/2;
    context.lineTo(currentX,currentY);
    currentX = currentX-width/4;
    currentY = currentY+height/2;
    context.lineTo(currentX,currentY);
    currentX = currentX-width/2;
    context.lineTo(currentX,currentY);
    currentX = currentX-width/4;
    currentY = currentY-height/2;
    context.lineTo(currentX,currentY);
    currentX = currentX+width/4;
    currentY = currentY-height/2;
    context.lineTo(currentX,currentY);

    context.strokeStyle = 'orange';
    context.stroke();
    if (isFilled == true) {
        context.fillStyle = 'orange';
        context.fill();
    }
}
/*drawHexagon(76, 120);
drawHexagon(76, 230);
drawHexagon(168.5, 65);
drawHexagon(168.5, 175);
drawHexagon(168.5, 285);
drawHexagon(261, 120);
drawHexagon(261, 230, true);*/

function drawCheckeredPattern(row,col) {
    var rowI = 0;
    var colI = 0;
    var width = drawingBoardWidth/col;
    var height = drawingBoardHeight/row;

    while (colI < col) {
        if (colI%2 == 0) {
            context.fillStyle = '#ffffff';
        } else {
            context.fillStyle = '#000000';
        }
        while (rowI < row) {
            if (context.fillStyle == '#ffffff') {
                context.fillStyle = '#000000';
            } else {
                context.fillStyle = '#ffffff';
            }
            context.fillRect(width*colI,height*rowI,width,height);
            rowI++;
        }
        rowI = 0;
        colI++;
    }
}
/*drawCheckeredPattern(8,8);*/

function drawTriangle2(positionX,positionY) {
    var smallTrinagleWidth = 100;
    var smallTrinagleHeight = 86.6;
    positionX=positionX-1.5*smallTrinagleWidth;
    drawTriangle(smallTrinagleWidth,smallTrinagleHeight,positionX+3*smallTrinagleWidth/2-smallTrinagleWidth/2,positionY,0,false,'top','rgb(227,98,102)','rgb(227,98,102)');

    drawTriangle(smallTrinagleWidth,smallTrinagleHeight,positionX+3*100/2-smallTrinagleWidth,positionY+smallTrinagleHeight,0,false,'top','rgb(38,172,73)','rgb(38,172,73)');
    drawTriangle(smallTrinagleWidth,smallTrinagleHeight,positionX+3*100/2,positionY+smallTrinagleHeight,0,false,'top','rgb(38,172,73)','rgb(38,172,73)');

    drawTriangle(smallTrinagleWidth,smallTrinagleHeight,positionX+3*100/2-smallTrinagleWidth*1.5,positionY+smallTrinagleHeight*2,0,false,'top','rgb(34,128,128)','rgb(34,128,128)');
    drawTriangle(smallTrinagleWidth,smallTrinagleHeight,positionX+3*smallTrinagleWidth/2-smallTrinagleWidth/2,positionY+smallTrinagleHeight*2,0,false,'top','rgb(34,128,128)','rgb(34,128,128)');
    drawTriangle(smallTrinagleWidth,smallTrinagleHeight,positionX+3*smallTrinagleWidth/2+smallTrinagleWidth/2,positionY+smallTrinagleHeight*2,0,false,'top','rgb(34,128,128)','rgb(34,128,128)');
}
/*drawTriangle2(225, 33);*/

function myArt() {
    var color;
    var i = 0;
    while (i<random(2000,1000)) {
        context.beginPath();
        context.arc(random(drawingBoardWidth,0),random(drawingBoardHeight,0), random(50,0), 0, 2 * Math.PI);
        color = 'rgba('+random(255,0)+', '+random(255,0)+', '+random(255,0)+', '+random(100,0)/100+')';
        context.strokeStyle = color;
        context.stroke();
        context.fillStyle = color;
        context.fill();
        i++;
    }
}
myArt();
