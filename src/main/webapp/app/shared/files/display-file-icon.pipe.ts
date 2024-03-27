import { Pipe, PipeTransform } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Pipe({
  standalone: true,
  name: 'getFileIcon',
})
export default class GetFileIcon implements PipeTransform {
  transform(fileName: string): { icon: IconProp; class: string } {
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    switch (fileExtension) {
      case 'xlsx':
      case 'xlsm':
      case 'xlsb':
      case 'xls':
      case 'xltx':
        return { icon: 'file-excel', class: 'text-success' };

      case 'csv':
        return { icon: 'file-csv', class: 'text-success' };

      case 'jpg':
      case 'png':
      case 'jpeg':
        return { icon: 'file-image', class: 'text-muted' };

      case 'doc':
      case 'docm':
      case 'docx':
      case 'dot':
        return { icon: 'file-word', class: 'text-primary' };

      case 'pdf':
        return { icon: 'file-pdf', class: 'text-danger' };

      case 'ppt':
      case 'pptx':
        return { icon: 'file-powerpoint', class: 'text-warning' };

      case 'zip':
      case 'rar':
      case '7z':
      case 'tar':
        return { icon: 'file-archive', class: 'text-dark' };

      default:
        return { icon: 'file-alt', class: 'text-secondary' };
    }
  }
}
