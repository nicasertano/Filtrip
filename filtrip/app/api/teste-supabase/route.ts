
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("destinos")
    .select("*")
    .limit(1);

  if (error) {
    return NextResponse.json(
      {
        conectado: false,
        erro: error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    conectado: true,
    mensagem: "Filtrip conectado ao Supabase!",
    destinosEncontrados: data.length,
  });
}