import {TestBed} from '@angular/core/testing';

import {EquipmentPartitionService} from './equipment-partition.service';

describe('EquipmentPartitionService', () => {
    let service: EquipmentPartitionService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EquipmentPartitionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
