/*****************************************************/
/*********************************************************
 * @file pxt-maqueen/maqueen.ts
 * @brief DFRobot's maqueen makecode library.
 * @n [Get the module here](https://www.dfrobot.com.cn/goods-1802.html)
 * @n This is a MakeCode graphical programming education robot.
 * 
 * @copyright    [DFRobot](http://www.dfrobot.com), 2016
 * @copyright    MIT Lesser General Public License
 * 
 * @author [email](jie.tang@dfrobot.com)
 * @date  2019-10-08
*/


//% weight=10 color=#008B00 icon="\uf136" block="Maqueen"
//% groups=['micro:bit(v2)']
namespace maqueen {

    export class Packeta {
        public mye: string;
        public myparam: number;
    }


    let irstate: string;
    let state: number;
    /**
    * Read IR sensor value V2.
    */

    //% advanced=true shim=maqueenIRV2::irCode
    function irCode(): number {
        return 0;
    }

    //% weight=5
    //% group="micro:bit(v2)"
    //% blockId=IR_readv2 block="read IR key value"
    export function IR_readV2(): string {
        let val = valuotokeyConversion();
        let str;
        switch (val) {
            case 11: str = 'A'; break;
            case 12: str = 'B'; break;
            case 13: str = 'C'; break;
            case 14: str = 'D'; break;
            case 21: str = 'UP'; break;
            case 66: str = '+'; break;
            case 24: str = 'LEFT'; break;
            case 55: str = 'OK'; break;
            case 22: str = 'RIGHT'; break;
            case 0: str = '0'; break;
            case 23: str = 'DOWN'; break;
            case 99: str = '-'; break;
            case 1: str = '1'; break;
            case 2: str = '2'; break;
            case 3: str = '3'; break;
            case 4: str = '4'; break;
            case 5: str = '5'; break;
            case 6: str = '6'; break;
            case 7: str = '7'; break;
            case 8: str = '8'; break;
            case 9: str = '9'; break;
            default:
                str = '-1';
        }
        return str;
    }

    //% weight=2
    //% group="micro:bit(v2)"
    //% blockId=IR_callbackUserv2 block="on IR received"
    //% draggableParameters
    export function IR_callbackUserV2(cb: (message: string) => void) {
        state = 1;
        control.onEvent(11, 22, function () {
            cb(irstate)
        })
    }

    function valuotokeyConversion(): number {
        let irdata: number;
        switch (irCode()) {
            case 0xba45: irdata = 11; break;
            case 0xb946: irdata = 12; break;
            case 0xb847: irdata = 13; break;
            case 0xbb44: irdata = 14; break;
            case 0xbf40: irdata = 21; break;
            case 0xbc43: irdata = 66; break;
            case 0xf807: irdata = 24; break;
            case 0xea15: irdata = 55; break;
            case 0xf609: irdata = 22; break;
            case 0xe916: irdata = 0; break;
            case 0xe619: irdata = 23; break;
            case 0xf20d: irdata = 99; break;
            case 0xf30c: irdata = 1; break;
            case 0xe718: irdata = 2; break;
            case 0xa15e: irdata = 3; break;
            case 0xf708: irdata = 4; break;
            case 0xe31c: irdata = 5; break;
            case 0xa55a: irdata = 6; break;
            case 0xbd42: irdata = 7; break;
            case 0xad52: irdata = 8; break;
            case 0xb54a: irdata = 9; break;
            default:
                irdata = -1;
        }
        return irdata;
    }

    basic.forever(() => {
        if (state == 1) {
            irstate = IR_readV2();
            if (irstate != '-1') {
                control.raiseEvent(11, 22)
            }
        }

        basic.pause(20);
    })



}
