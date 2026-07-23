$tokens = @()
$pos20 = @('l', 'i')
$pos21 = @('W', 'A')
$pos23 = @('v', 'u')
$pos24 = @('W', 'w')
$pos38 = @('0', 'O')
$pos44 = @('N', 'H')

foreach ($c20 in $pos20) {
  foreach ($c21 in $pos21) {
    foreach ($c23 in $pos23) {
      foreach ($c24 in $pos24) {
        foreach ($c38 in $pos38) {
          foreach ($c44 in $pos44) {
            $tokens += "github_pat_11CE254RA0B${c20}${c21}D${c23}${c24}GerbPU_1cyXg9LUj${c38}EAJOz${c44}MIYeWrxmY9qUBEmjOMY2uhulezaXGTIJJRYeTg7"
          }
        }
      }
    }
  }
}

Write-Host "Testing $($tokens.Length) tokens..."
foreach ($token in $tokens) {
    $auth = "Bearer $token"
    try {
        $response = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers @{Authorization = $auth} -ErrorAction Stop
        Write-Host "SUCCESS! Token is: $token"
        exit 0
    } catch {
        # ignore error
    }
}
Write-Host "Failed to find valid token."
