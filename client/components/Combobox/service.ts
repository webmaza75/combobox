class Loader {

    //private url: string = `https://jsonplaceholder.typicode.com/photos/`;
    private url: string = `https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=`;

    public getHints(searchVal) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            let fullUrl = searchVal ? this.url + searchVal : '';
            xhr.open('GET', fullUrl, true);
    
            xhr.onload = function () {
                if (xhr.status == 200) {       
                    try {
                        let res = JSON.parse(xhr.response);
                        resolve(res);
                    } catch (e) {
                        resolve([]);
                    }
                } else {
                    let error = new Error(xhr.statusText);
                    error.name = xhr.status + '';
                    reject(error);
                }
            };
    
            xhr.onerror = function () {
                reject(new Error("Network Error"));
            };
    
            xhr.send();
        });
    }
}

const loader = new Loader();
export default loader;