import { Pipe, PipeTransform } from '@angular/core';
// import { Observable } from "rxjs";

@Pipe({
    name: 'chunk',
})
export default class Chunk implements PipeTransform {

    transform(items: any[], chunks: number) {
        let result = [];
        let itemsCopy = items;

        while (itemsCopy.length) {
            result.push(itemsCopy.splice(0, chunks));
        }

        return result;
    }

}