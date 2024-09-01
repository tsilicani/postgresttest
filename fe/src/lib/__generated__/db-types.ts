export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      city: {
        Row: {
          countrycode: string
          district: string
          id: number
          name: string
          population: number
        }
        Insert: {
          countrycode: string
          district: string
          id: number
          name: string
          population: number
        }
        Update: {
          countrycode?: string
          district?: string
          id?: number
          name?: string
          population?: number
        }
        Relationships: []
      }
      country: {
        Row: {
          capital: number | null
          code: string
          code2: string
          continent: string
          gnp: number | null
          gnpold: number | null
          governmentform: string
          headofstate: string | null
          indepyear: number | null
          lifeexpectancy: number | null
          localname: string
          name: string
          population: number
          region: string
          surfacearea: number
        }
        Insert: {
          capital?: number | null
          code: string
          code2: string
          continent: string
          gnp?: number | null
          gnpold?: number | null
          governmentform: string
          headofstate?: string | null
          indepyear?: number | null
          lifeexpectancy?: number | null
          localname: string
          name: string
          population: number
          region: string
          surfacearea: number
        }
        Update: {
          capital?: number | null
          code?: string
          code2?: string
          continent?: string
          gnp?: number | null
          gnpold?: number | null
          governmentform?: string
          headofstate?: string | null
          indepyear?: number | null
          lifeexpectancy?: number | null
          localname?: string
          name?: string
          population?: number
          region?: string
          surfacearea?: number
        }
        Relationships: [
          {
            foreignKeyName: "country_capital_fkey"
            columns: ["capital"]
            isOneToOne: false
            referencedRelation: "city"
            referencedColumns: ["id"]
          },
        ]
      }
      countrylanguage: {
        Row: {
          countrycode: string
          isofficial: boolean
          language: string
          percentage: number
        }
        Insert: {
          countrycode: string
          isofficial: boolean
          language: string
          percentage: number
        }
        Update: {
          countrycode?: string
          isofficial?: boolean
          language?: string
          percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "countrylanguage_countrycode_fkey"
            columns: ["countrycode"]
            isOneToOne: false
            referencedRelation: "country"
            referencedColumns: ["code"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

