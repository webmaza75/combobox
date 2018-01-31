class Loader {

    private url: string = `https://jsonplaceholder.typicode.com/photos/`;

    public getHints() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.url, true);
    
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
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