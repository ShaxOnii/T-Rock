using System;

namespace TRockApi.Utils.Errors {
    public abstract class Error : Exception{
       public abstract string Message();

       public abstract string  Name();
    }
}