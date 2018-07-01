export class AppSettings {
  public static Api_Endpoint = "http://localhost:8383/api/";
  public static Image_Endpoint = "http://localhost:8383/";

  public static Public_Site_Domain = ".hiscript.in";

  // Snack Bar
  public static Delete_Undo_Duration = 3000;
  public static Success_Duration = 2000;
  public static Error_Duration = 3000;

  // Control
  public static Phone_Prefix = "+91";
  public static Phone_Pattern = "^[789][0-9]{9}$";

  public static Number_Pattern = "^(-[1-9])?[0-9]*$";
  public static Positive_Number_Pattern = "^(?!0[0-9]|$)[0-9]*$";

  public static Decimal_Pattern = "^([-]?(?!0[0-9]|$))[0-9]*(.[0-9]{1,4})?$";
  public static Positive_Decimal_Pattern = "^(?!0[0-9]|$)[0-9]*(.[0-9]{1,4})?$";
}
