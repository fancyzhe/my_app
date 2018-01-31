import {_cleanParams} from "../../../../../web_myproject/p_datav/src/common/utils";

/**
 *
 * @fanz
 */

const setTitle = title => ()=> document.title = title;

const onEnter = (event, beforeEnter) => {
    if (typeof beforeEnter === 'function') {
        beforeEnter(event);
    }
    if (event.keyCode === 0x0D || event.keyCode === 0x0A) {
        return Promise.resolve(event);
    } else {
        return Promise.reject(event);
    }
};

const setStateP = function(state) {
    return new Promise(resolve => this.setState(state, resolve));
};

const ALL_VALUE = 'ALL_VALUE';

const cleanParams = params => _cleanParams(params, [ALL_VALUE, '', null, undefined]);

export {
    setTitle,
    onEnter,
    setStateP,
    ALL_VALUE,
    cleanParams,
}