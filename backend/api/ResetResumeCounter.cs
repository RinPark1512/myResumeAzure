using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.Functions.Worker;
using System.Configuration;
using Microsoft.Azure.WebJobs.Host;
using System.Net.Http;
using System.Text;

namespace Company.Function
{
    public static class ResetResumeCounter
    {
        [FunctionName("ResetResumeCounter")]
        public static HttpResponseMessage Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName:"AzureResume", 
                collectionName: "Counter", 
                ConnectionStringSetting = "AzureResumeConnectionString", 
                Id = "1",
                PartitionKey = "1")] Counter counter, // gets populated when func runs
            [CosmosDB(
                databaseName:"AzureResume", 
                collectionName: "Counter", 
                ConnectionStringSetting = "AzureResumeConnectionString", 
                Id = "1",
                PartitionKey = "1")] out Counter updatedCounter,
            
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            updatedCounter = counter; // update the counter
            updatedCounter.Count = 0;

            var jsonToReturn = JsonConvert.SerializeObject(counter);
            
            return new HttpResponseMessage(System.Net.HttpStatusCode.OK) {
                Content = new StringContent(jsonToReturn, Encoding.UTF8, "application/json")
            };
        }
    }
}
