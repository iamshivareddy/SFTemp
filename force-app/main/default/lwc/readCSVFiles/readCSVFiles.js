import { LightningElement, track } from 'lwc';
import readCSVFiles from '@salesforce/apex/CSVController.readCSVFiles';
import addRecordsToAccount from '@salesforce/apex/CSVController.addRecordsToAccount';

export default class ReadCSVFiles extends LightningElement {
    @track fileData;
    @track disableAddButton = true;

    handleUploadFinished(event) {
        this.fileData = event.detail.files.map(file => {
            return {
                fileName: file.name,
                records: []
            };
        });
        this.disableAddButton = true;
    }

    handleReadFiles() {
        const fileIds = this.fileData.map(file => file.documentId);
        readCSVFiles({ fileIds })
            .then(result => {
                result.forEach(record => {
                    const fileData = this.fileData.find(file => file.documentId === record.documentId);
                    fileData.records.push(record.data);
                });
                this.fileData = [...this.fileData]; // Trigger UI re-render
                this.disableAddButton = false;
            })
            .catch(error => {
                console.error('Error reading CSV files', error);
            });
    }

    handleAddRecords() {
        const records = this.fileData.flatMap(file => file.records);
        addRecordsToAccount({ records })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Records added to Account.',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                console.error('Error adding records to Account', error);
            });
    }
}