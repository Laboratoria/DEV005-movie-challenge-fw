import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    transform(value: any[], order: string): any[] {
        if (!Array.isArray(value)) {
            return value;
        }

        if (order === 'votosAsc') {
            return value.sort((a, b) => b.vote_average - a.vote_average);
        } else if (order === 'votosDesc') {
            return value.sort((a, b) => a.vote_average - b.vote_average);
        } else if (order === 'asc') {
            return value.sort((a, b) => a.title.localeCompare(b.title));
        } else if (order === 'desc') {
            return value.sort((a, b) => b.title.localeCompare(a.title));
        } else {
            // Ordenar por título de manera predeterminada (ascendente)
            return value.sort((a, b) => a.title.localeCompare(b.title));
        }
    }
}
