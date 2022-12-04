import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateBoulderModel } from 'src/app/shared/models/boulder.model';
import { ColorCreate } from 'src/app/shared/models/color.model';
import { BoulderService } from 'src/app/shared/services/boulder.service';
import { ColorService } from 'src/app/shared/services/color.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-boulder-create',
  templateUrl: './boulder-create.component.html',
  styleUrls: ['./boulder-create.component.sass']
})
export class BoulderCreateComponent {
  boulderForm = this.fb.group({
    settersSelect: [0, Validators.required],
    grade: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('^[3-9]{1}[abc]?[+-]?')]],
    colorsSelect: [0, Validators.required]
  });

  colorForm = this.fb.group({
    colorName: ['', Validators.required],
    hexCode: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    public colorService: ColorService,
    private boulderService: BoulderService,
    private imageService: ImageService
  ) { }

  createBoulder(i: HTMLInputElement) {
    this.boulderService.create(new CreateBoulderModel(
      this.boulderForm.value.settersSelect ?? 0,
      this.boulderForm.value.grade ?? '',
      this.boulderForm.value.colorsSelect ?? 0
    )).subscribe({
      next: (data: { boulderId: number }) => {
        if (i.files) {
          const imgFile: File = i.files[0];
          if (imgFile != null && imgFile.size < 2097152) {
            const formData = new FormData();
            formData.append('image', imgFile);
            this.imageService.upload('boulders', data.boulderId, formData).subscribe({
              complete: () => this.boulderService.getAll()
            });
          }
        }
      }
    })
  }

  createColor() {
    this.colorService.create(new ColorCreate(this.colorForm.value.colorName ?? 'black', this.colorForm.value.hexCode ?? '#000000'));
  }

}
