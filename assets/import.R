library(jsonlite)
library(readxl)
library(data.table)


#import du fichier excel
data<-read_excel("D:/Privé/Pouroucontre/assets/Questions.xlsx",sheet="Agregation")

setDT(data)

setnames(data,'...1','question')


#traitement de données pour export object javascript
data<-melt(data, id=1)

data$value<-as.numeric(data$value)

data_plus<-data[!is.na(value),.(merged = paste(variable,value,sep=" : ")),by=question]
data_plus<-data_plus[, list(text = paste(merged, collapse=" , ")), by = question]

data_moins<-data[!is.na(value),.(merged = paste(variable,-value,sep=" : ")),by=question]
data_moins<-data_moins[, list(text = paste(merged, collapse=" , ")), by = question]


export <-"["


for(j in 1:length(data_plus$question)){
  export <- paste(export,"{ 
                  question :","\"",data_plus$question[j],"\",  
                  answers: [
                  { id: \"1\", text: \"Pour\" , ",data_plus$text[j],"},
                  { id: \"2\", text: \"Contre\" , ",data_moins$text[j],"},
                  ]
                  },"
)}

export <-paste(export,"];")

fileConn<-file("output.txt")
writeLines(export, fileConn)
close(fileConn)
