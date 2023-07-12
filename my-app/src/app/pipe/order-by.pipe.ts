import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    transform(value: any[], order = 'asc'): any[] {
        if (!Array.isArray(value)) {
            return value;
        }

        return value.sort((a, b) => {
            const compare = a.title.localeCompare(b.title);
            return order === 'asc' ? compare : -compare;
        });
    }
}
