
DROP POLICY "System inserts logs" ON public.activity_logs;
CREATE POLICY "Authenticated users insert logs" ON public.activity_logs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
