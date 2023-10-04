Write-Host ""
Write-Host "What would you like to do?"
Write-Host ""
Write-Host "    A) Collect new Baseline?"
Write-Host "    B) Begin monitoring files with saved Baseline?"
Write-Host ""
$response = Read-Host -Prompt "Please enter 'A' or 'B'"
Write-Host ""



Function Calculate-File-Hash($filepath){
   $filehash=Get-FileHash -Path $filepath -Algorithm SHA512
   return $filehash

}


Function Erase-Baseline-If-Already-Exist(){

    $baselineExists = Test-Path -Path .\baseline.txt

    if ($baselineExists) {
        # Delete it
        Remove-Item -Path .\baseline.txt
    }



}



if ($response -eq "A".ToUpper()) {
    
    Erase-Baseline-If-Already-Exist

    $files=Get-ChildItem -Path .\Files


    foreach ($f in $files) {
        $hash = Calculate-File-Hash $f.FullName
        "$($hash.Path)|$($hash.Hash)" | Out-File -FilePath .\baseline.txt -Append
    }
    



}




if ($response -eq "B".ToUpper()) {

    

    $fileHashDictionary = @{}


    $filePathsAndHashes = Get-Content -Path .\baseline.txt
    

    foreach ($f in $filePathsAndHashes) {

         #$f.Split("|")[1]
         $fileHashDictionary.add($f.Split("|")[0],$f.Split("|")[1])
    }
    

   
    while ($true) {
        Start-Sleep -Seconds 1

        $files = Get-ChildItem -Path .\Files

        # For each file, calculate the hash, and write to baseline.txt
        foreach ($f in $files) {
            $hash = Calculate-File-Hash $f.FullName
            #"$($hash.Path)|$($hash.Hash)" | Out-File -FilePath .\baseline.txt -Append


            if ($fileHashDictionary[$hash.Path] -eq $null) {
                # A new file has been created!
                Write-Host "$($hash.Path) has been created!" -ForegroundColor Green
            }
                else {

                # Notify if a new file has been changed
                if ($fileHashDictionary[$hash.Path] -eq $hash.Hash) {
                    # The file has not changed
                }
                else {
                    # File file has been compromised!, notify the user
                    Write-Host "$($hash.Path) has changed!!!" -ForegroundColor Yellow
                }
            }

         }

         
         foreach ($key in $fileHashDictionary.Keys) {
            $baselineFileStillExists = Test-Path -Path $key
            if (-Not $baselineFileStillExists) {
                # One of the baseline files must have been deleted, notify the user
                Write-Host "$($key) has been deleted!" -ForegroundColor DarkRed -BackgroundColor Gray
            }
        }

           
        
        
    }
    
    
    #Write-Host "B"
}
