import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import readCSV from '@salesforce/apex/LWCExampleController.readCSVFile';

const columns = [
    { label: 'Id' ,fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Ratingc', fieldName: 'Rating' },
    { label: 'Typec', fieldName: 'Typec' },
    { label: 'Website', fieldName: 'Website', type: 'url' }
];

export default class ReadCSVFileInLWC extends LightningElement {
    @api recordId;
    @track error;
    @track columns = columns;
    @track data;
    @track uploadedFiles = [];

    // accepted parameters
    get acceptedFormats() {
        return ['.csv'];
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const newlyUploadedFiles = event.detail.files;

        // Merge newly uploaded files with already uploaded files
        this.uploadedFiles = this.uploadedFiles.concat(newlyUploadedFiles);

        if (this.uploadedFiles.length > 0) {

            this.showButton = true;

       }
    }

    handleProcessFiles() {

        // Call Apex method only when two files are uploaded
        const promises = this.uploadedFiles.map(file => {
            return new Promise((resolve, reject) => {
                readCSV({ idContentDocument: file.documentId })
                    .then(result => {
                        resolve(result);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        });   


        /* // Counter variable for assigning Id values
        
            let idCounter = 1;
          
            const promises = this.uploadedFiles.map(file => {
                return new Promise((resolve, reject) => {
                    readCSV({ idContentDocument: file.documentId })
                        .then(result => {
                            // Add the Id field to each record in the result data
                            const modifiedResult = result.map(record => ({
                                AId: 'ID' + idCounter++, // Assigning incremental Id values
                                ...record
                            }));
        
                            resolve(modifiedResult);
                        })
                        .catch(error => {
                            reject(error);
                        });
                });
            });   */ 
        
        
        

        Promise.all(promises)
            .then(results => {
                let mergedData = [];
                console.log(`results : `, results);
                // Merge the data from all CSV files into a single array
                results.forEach(result => {
                    console.log("row : " + JSON.stringify(result));
                    mergedData = mergedData.concat(result);
                });

                this.data = mergedData;

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success!!',
                        message: 'Accounts are created based on CSV files!',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error!!',
                        message: JSON.stringify(error),
                        variant: 'error'
                    })
                );
            });
    }
}