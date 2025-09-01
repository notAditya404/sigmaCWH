function driver(val)
{
    let currexp = document.getElementsByClassName("exp")[0]
    switch (val) {
        // for all clear
        case 'ac':
            document.getElementsByClassName("exp")[0].textContent = ""
            break;
        // for clear
        case 'clr':
            currexp.textContent = currexp.textContent.slice(0,currexp.textContent.length-1)
            break;
        
        // for nums
        case '0':
            currexp.textContent += "0"
            break;
        case '1':
            currexp.textContent += "1"
            break;
        case '2':
            currexp.textContent += "2"
            break;
        case '3':
            currexp.textContent += "3"
            break;
        case '4':
            currexp.textContent += "4"
            break;
        case '5':
            currexp.textContent += "5"
            break;
        case '6':
            currexp.textContent += "6"
            break;
        case '7':
            currexp.textContent += "7"
            break;
        case '8':
            currexp.textContent += "8"
            break;
        case '9':
            currexp.textContent += "9"
            break;

        // for operator
        case '(':
            currexp.textContent += "("
            break;
        case ')':
            currexp.textContent += ")"
            break;
        case '/':
            currexp.textContent += "/"
            break;
        case 'x':
            currexp.textContent += "x"
            break;
        case '-':
            currexp.textContent += "-"
            break;
        case '+':
            currexp.textContent += "+"
            break;

        // for eqaulity
        case '=':
            let stk = strtostack(currexp.textContent)
            let postexp = inToPostfix(stk)
            let result = evalPostfix(postexp)
            currexp.textContent = result
        default:
            break;
    }
}


function strtostack(exp)
{

    let currindx = 0;
    let matchindx = 0;
    
    let stk = [];
    let regex = /\d+/g;
    const matches = [...exp.matchAll(regex)];
    
    while(currindx<exp.length)
    {
        if(matchindx < matches.length && currindx==matches[matchindx].index)
        {
            stk.push(Number(matches[matchindx][0]))
            currindx += matches[matchindx][0].length
            matchindx += 1
            continue
        }
        stk.push(exp[currindx])
        currindx+=1
    }
    return stk
}


function inToPostfix(instk)
{
    let poststk = []
    let tempstk = []
    let currEle;
    tempstk.push('(')
    instk.push(')')
    for(let i=0; i<instk.length; i++)
    {
        currEle = instk[i];
        if(Number.isInteger(currEle))
        {
            poststk.push(currEle)
        }
        else if(currEle=='(')
        {
            tempstk.push(currEle)
        }
        else if(currEle==')')
        {
            let temp = tempstk.pop()
            while(temp!='(')
            {
                poststk.push(temp)
                temp = tempstk.pop()
            }
        }
        else
        {
            let temp;
            if(currEle=='x')
            {
                temp=tempstk.pop();
                if(temp=='x' || temp == '/')
                {
                    poststk.push(temp)
                }
                else{
                    tempstk.push(temp)
                    tempstk.push(currEle)
                }
            }
            else if(currEle=='/')
            {
                temp=tempstk.pop();
                if(temp=='x' || temp == '/')
                {
                    poststk.push(temp)
                }
                else{
                    tempstk.push(temp)
                    tempstk.push(currEle)
                }
            }
            else if(currEle=='+')
            {
                temp=tempstk.pop();
                if(temp=='+' || temp == '-'|| temp == 'x'|| temp == '/')
                {
                    poststk.push(temp)
                }
                else{
                    tempstk.push(temp)
                    tempstk.push(currEle)
                }
            }
            else if(currEle=='-')
            {
                temp=tempstk.pop();
                if(temp=='+' || temp == '-' || temp == '*'|| temp == '/')
                {
                    poststk.push(temp)
                }
                else{
                    tempstk.push(temp)
                    tempstk.push(currEle)
                }
            }
        }
    }
    return poststk
}

function evalPostfix(postexp)
{
    postexp.push(')')

    let A;
    let B;
    let tempstk = []
    let currEle;
    let index = 0;

    while(index<postexp.length && postexp[index]!=')')
    {
        currEle = postexp[index]

        if(Number.isInteger(currEle))
        {
            tempstk.push(currEle)
        }
        else if(currEle=='+')
        {
            A = tempstk.pop()
            B = tempstk.pop()
            
            tempstk.push(B + A)
        }
        else if(currEle=='-')
        {
            A = tempstk.pop()
            B = tempstk.pop()
            
            tempstk.push(B - A)
        }
        else if(currEle=='x')
        {
            A = tempstk.pop()
            B = tempstk.pop()
            
            tempstk.push(B * A)
        }
        else if(currEle=='/')
        {
            A = tempstk.pop()
            B = tempstk.pop()
            
            tempstk.push(B / A)
        }
        index+=1
    }
    return tempstk.pop()
}