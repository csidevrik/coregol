import 'package:flutter/material.dart';

class Sidebar extends StatelessWidget {
  const Sidebar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 60,
      color: const Color(0xFFF5F5F5),
      child: Column(
        children: [
          const SizedBox(height: 20),
          _SidebarItem(
            icon: Icons.home,
            activeColor: Colors.purple,
            onTap: () {},
          ),
          _SidebarItem(
            icon: Icons.settings,
            activeColor: Colors.purple,
            onTap: () {},
          ),
          _SidebarItem(
            icon: Icons.person,
            activeColor: Colors.purple,
            onTap: () {},
          ),
          const Spacer(),
          _SidebarItem(
            icon: Icons.help_outline,
            activeColor: Colors.purple,
            onTap: () {},
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }
}

class _SidebarItem extends StatefulWidget {
  final IconData icon;
  final Color activeColor;
  final VoidCallback onTap;

  const _SidebarItem({
    required this.icon,
    required this.activeColor,
    required this.onTap,
  });

  @override
  State<_SidebarItem> createState() => _SidebarItemState();
}

class _SidebarItemState extends State<_SidebarItem> {
  bool isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => isHovered = true),
      onExit: (_) => setState(() => isHovered = false),
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: isHovered
                ? widget.activeColor.withOpacity(0.1)
                : Colors.transparent,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(
            widget.icon,
            color: isHovered ? widget.activeColor : Colors.grey[600],
            size: 24,
          ),
        ),
      ),
    );
  }
}
