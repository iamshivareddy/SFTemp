public inherited sharing class CSVController {
    @AuraEnabled
    public static List<FileData> readCSVFiles(List<Id> fileIds) {
        List<FileData> fileDataList = new List<FileData>();

        // Retrieve File Data based on ContentVersion Ids
        List<ContentVersion> contentVersions = [SELECT Id, Title, VersionData
                                                FROM ContentVersion
                                                WHERE Id IN :fileIds];

        for (ContentVersion version : contentVersions) {
            List<String> csvLines = version.VersionData.toString().split('\n');
            List<String> csvRecords = new List<String>();

            // Process CSV Data
            for (Integer i = 1; i < csvLines.size(); i++) {
                csvRecords.add(csvLines[i]);
            }

            FileData fileData = new FileData(version.Title, csvRecords);
            fileDataList.add(fileData);
        }

        return fileDataList;
    }

    @AuraEnabled
    public static void addRecordsToAccount(List<String> records) {
        List<Account> accountsToAdd = new List<Account>();
        for (String record : records) {
            List<String> csvRowData = record.split(',');
            Account account = new Account();
            account.Name = csvRowData[0];
            account.Industry = csvRowData[1];
            account.Rating = csvRowData[2];
            account.Type = csvRowData[3];
            account.Website = csvRowData[4];
            accountsToAdd.add(account);
        }
        if (!accountsToAdd.isEmpty()) {
            insert accountsToAdd;
        }
    }

    public class FileData {
        @AuraEnabled public String fileName;
        @AuraEnabled public List<String> records;

        public FileData(String fileName, List<String> records) {
            this.fileName = fileName;
            this.records = records;
        }
    }
}