import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl) throw new Error('VITE_SUPABASE_URL is required');
if (!supabaseAnonKey) throw new Error('VITE_SUPABASE_ANON_KEY is required');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(email: string, password: string, nome: string, telefone?: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { data, error };
  if (data.user) {
    await supabase.from('usuarios').insert({
      id: data.user.id,
      email,
      nome,
      telefone,
      role: 'cliente',
    });
  }
  return { data, error };
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getSession() {
  return supabase.auth.getSession();
}
