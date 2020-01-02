using System;

namespace Domain
{
    public class Value
    {
        public int Id {get; set;} 
        // If a column is named Id it is a primary key by default
        // But can be override in the migration create table file 
        public string Name {get; set;}
    }
}
