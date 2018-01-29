// класс с rest-api методами
/* JS класс, в нем метод getHints например. 
* В нем ты вызваешь сам удаленный сервис. 
* При этом сам этот метод у тебя должен возврщать Promise
* Вот этот метод у тебя должен вызваться в соответствующем метода в файле Actions,ts
* (Async Loader)
* Делается обычная функция в Action.ts, ее задача внутри себя вызвать 
* dispatch({type: "BEGIN"}), далее вызвать getHints, и в промисе передать callback, 
* который вызовит dispatch({type: "SUCCESS"}). Аналогично сделать для callback errors
* В редусере у тебя соответсвенно будет обработка  GET_HINTS_BEGIN, GET_HINTS_SUCCESEE и GET_HINTS_FAIL
*/ 