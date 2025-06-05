import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class Topbar extends StatelessWidget {
  const Topbar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(30, 20, 20, 20),
      color: AppTheme.primary, // Fondo de la barra superior
      child: Text(
        'Good Evening',
        style: Theme.of(context).textTheme.titleLarge?.copyWith(
              color: AppTheme.onPrimary, // Color del texto sobre primary
            ),
      ),
    );
  }
}
