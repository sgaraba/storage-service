import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    standalone: true,
    name: 'nameDisplay'
})
export class NameDisplayPipe implements PipeTransform {
    transform(value: any, showFullName: boolean = true): string {
        if (!value) return '';

        if (typeof value === 'string') {
            return value; // Tratează cazul în care valoarea este deja un șir de caractere
        }

        if (typeof value === 'object') {
            const firstName = value.firstName || '';
            const lastName = value.lastName || '';
            const username = value.login || '';

            if (showFullName) {
                if (firstName.trim() === '' && lastName.trim() === '') {
                    return username; // Afiseaza numele contului daca numele si prenumele sunt nule sau goale
                } else {
                    return `${firstName.trim()} ${lastName.trim()}` || username;
                }
            } else {
                return username || ''; // Afiseaza numele contului
            }
        }

        return '';
    }
}

